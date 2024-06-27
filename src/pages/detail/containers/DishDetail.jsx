import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from 'react-router-dom';
import {
    Button,
    Chip,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {useIntl} from "react-intl";
import {ArrowBack, Edit} from "@mui/icons-material";
import {mockIngredients, mockCuisines, mockDietarySpecifics} from "../../../app/constants/mockdata"

const defaultDishValue = {
    name: '',
    description: '',
    price: 0,
    weight: 0,
    calories: 0,
    category: {id: '', name: ''},
    ingredients: [],
    cuisines: [],
    dietarySpecifics: []
}

const DishDetail = ({backPagePath, onFetchDishData, onCreateDish,
                        onFetchCategories, onUpdateDish}) => {
    const {formatMessage} = useIntl();
    const {id} = useParams();
    const navigate = useNavigate();
    const {dish} = useSelector(state => state.menu);
    const [isDishFetched, setIsDishFetched] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [localDish, setLocalDish] = useState(defaultDishValue);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [errors, setErrors] = useState({});
    const {categories} = useSelector(state => state.category);


    useEffect(() => {

            if (Number(id)) {
                getDish(id)
            } else {
                setEditMode(true);
                setLocalDish(defaultDishValue);
            }
    }, [isDishFetched]);

    const getDish = (dishId) => {
        if (!isDishFetched) {
            onFetchDishData(dishId);
            setIsDishFetched(true);
        }
    }

    const handleFieldChange = (event) => {
        const {name, value} = event.target;
        setLocalDish(prevState => ({...prevState, [name]: value}));
    };


    const handleArrayChange = (event, fieldName) => {
        setLocalDish(prevState => ({...prevState, [fieldName]: event.target.value}));
    };

    const validateFields = () => {
        let tempErrors = {};
        if (!localDish.name) tempErrors.name = formatMessage({id: 'error.required'});
        if (!localDish.description) tempErrors.description = formatMessage({id: 'error.required'});
        if (localDish.price <= 0) tempErrors.price = formatMessage({id: 'error.invalidPrice'});
        if (localDish.weight <= 0) tempErrors.weight = formatMessage({id: 'error.invalidWeight'});
        if (localDish.calories <= 0) tempErrors.calories = formatMessage({id: 'error.invalidCalories'});
        if (!localDish.category.id) tempErrors.category = formatMessage({id: 'error.required'});
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSave = () => {
        if (validateFields()) {
            if (Number(id)) {
                onUpdateDish(id, {
                    id: Number(id),
                    name: localDish.name,
                    description: localDish.description,
                    weight: localDish.weight,
                    calories: localDish.calories,
                    price: localDish.price,
                    ingredients: localDish.ingredients,
                    dietarySpecifics: localDish.dietarySpecifics,
                    cuisines: localDish.cuisines
                })
                    .then(() => {
                        setSnackbarMessage(formatMessage({id: 'msg.updateSuccess'}));
                        setIsSnackbarOpen(true);

                        setEditMode(false);

                        setIsDishFetched(false)
                        console.log("Update success");
                    })
                    .catch(() => {
                        setSnackbarMessage(formatMessage({id: 'msg.updateFail'}));
                        setIsSnackbarOpen(true);
                        console.log("Update fail")
                    });
            } else {
                onCreateDish({
                    name: localDish.name,
                    description: localDish.description,
                    categoryId: localDish.category.id,
                    weight: localDish.weight,
                    calories: localDish.calories,
                    price: localDish.price,
                    ingredients: localDish.ingredients,
                    dietarySpecifics: localDish.dietarySpecifics,
                    cuisines: localDish.cuisines
                })
                    .then(() => {
                        setSnackbarMessage(formatMessage({id: 'msg.createSuccess'}));
                        setIsSnackbarOpen(true);
                        navigate(backPagePath);
                    })
                    .catch(() => {
                        setSnackbarMessage(formatMessage({id: 'msg.createFail'}));
                        setIsSnackbarOpen(true);
                    });
            }
        }
    };

    const handleCancel = () => {
        if (Number(id)) {
            setEditMode(false);
        } else {
            navigate(backPagePath)
        }

    };

    const handleBack = () => {
        navigate(backPagePath);
        setLocalDish({
            name: '',
            description: '',
            price: 0,
            weight: 0,
            calories: 0,
            category: {id: '', name: ''},
            ingredients: [],
            cuisines: [],
            dietarySpecifics: []
        });
    };


    return (
        <div>
            <IconButton onClick={handleBack}>
                <ArrowBack/>
            </IconButton>
            {(!editMode) ? (
                <>
                    <Typography variant="h4">{dish.name}</Typography>
                    <Typography variant="body1">{dish.description}</Typography>
                    <Typography variant="body1">{formatMessage({id: 'field.price'})}: {dish.price}</Typography>
                    <Typography variant="body1">{formatMessage({id: 'field.weight'})}: {dish.weight}g</Typography>
                    <Typography
                        variant="body1">{formatMessage({id: 'field.calories'})}: {dish.calories} kcal</Typography>
                    <Typography
                        variant="body1">{formatMessage({id: 'field.category'})}: {dish.category.name}</Typography>
                    <Typography
                        variant="body1">{formatMessage({id: 'field.ingredients'})}: {dish.ingredients.join(', ')}</Typography>
                    <Typography
                        variant="body1">{formatMessage({id: 'field.cuisines'})}: {dish.cuisines.join(', ')}</Typography>
                    <Typography
                        variant="body1">{formatMessage({id: 'field.dietarySpecifics'})}: {dish.dietarySpecifics.join(', ')}</Typography>
                    <IconButton onClick={() => {
                        setLocalDish(dish);
                        setEditMode(true);
                    }}>
                        <Edit/>
                    </IconButton>
                </>
            ) : (
                <>
                    <TextField
                        label={formatMessage({id: 'field.name'})}
                        name="name"
                        value={localDish.name}
                        onChange={handleFieldChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                    />
                    <TextField
                        label={formatMessage({id: 'field.description'})}
                        name="description"
                        value={localDish.description}
                        onChange={handleFieldChange}
                        error={!!errors.description}
                        helperText={errors.description}
                        fullWidth
                    />
                    <TextField
                        label={formatMessage({id: 'field.price'})}
                        name="price"
                        type="number"
                        value={localDish.price}
                        onChange={handleFieldChange}
                        error={!!errors.price}
                        helperText={errors.price}
                        fullWidth
                    />
                    <TextField
                        label={formatMessage({id: 'field.weight'})}
                        name="weight"
                        type="number"
                        value={localDish.weight}
                        onChange={handleFieldChange}
                        error={!!errors.weight}
                        helperText={errors.weight}
                        fullWidth
                    />
                    <TextField
                        label={formatMessage({id: 'field.calories'})}
                        name="calories"
                        type="number"
                        value={localDish.calories}
                        onChange={handleFieldChange}
                        error={!!errors.calories}
                        helperText={errors.calories}
                        fullWidth
                    />
                    {!Number(id) && (<FormControl fullWidth>
                        <InputLabel>{formatMessage({id: 'field.category'})}</InputLabel>
                        <Select
                            name="category"
                            value={localDish.category.id}
                            onChange={(e) => handleFieldChange({
                                target: {
                                    name: 'category',
                                    value: categories.find(cat => cat.id === e.target.value)
                                }
                            })}
                            error={!!errors.category}
                        >
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>)}
                    <FormControl fullWidth>
                        <InputLabel>{formatMessage({id: 'field.ingredients'})}</InputLabel>
                        <Select
                            multiple
                            name="ingredients"
                            value={localDish.ingredients}
                            onChange={(e) => handleArrayChange(e, 'ingredients')}
                            renderValue={(selected) => (
                                <div>{selected.map((value) => <Chip key={value} label={value}/>)}</div>
                            )}
                        >
                            {mockIngredients.map(ingredient => (
                                <MenuItem key={ingredient} value={ingredient}>{ingredient}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>{formatMessage({id: 'field.cuisines'})}</InputLabel>
                        <Select
                            multiple
                            name="cuisines"
                            value={localDish.cuisines}
                            onChange={(e) => handleArrayChange(e, 'cuisines')}
                            renderValue={(selected) => (
                                <div>{selected.map((value) => <Chip key={value} label={value}/>)}</div>
                            )}
                        >
                            {mockCuisines.map(cuisine => (
                                <MenuItem key={cuisine} value={cuisine}>{cuisine}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>{formatMessage({id: 'field.dietarySpecifics'})}</InputLabel>
                        <Select
                            multiple
                            name="dietarySpecifics"
                            value={localDish.dietarySpecifics}
                            onChange={(e) => handleArrayChange(e, 'dietarySpecifics')}
                            renderValue={(selected) => (
                                <div>{selected.map((value) => <Chip key={value} label={value}/>)}</div>
                            )}
                        >
                            {mockDietarySpecifics.map(dietarySpecific => (
                                <MenuItem key={dietarySpecific} value={dietarySpecific}>{dietarySpecific}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary"
                            onClick={handleSave}>{formatMessage({id: 'action.save'})}</Button>
                    <Button variant="contained" onClick={handleCancel}>{formatMessage({id: 'action.cancel'})}</Button>
                </>
            )}
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={6000}
                onClose={() => setIsSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </div>
    );
}

export default DishDetail;