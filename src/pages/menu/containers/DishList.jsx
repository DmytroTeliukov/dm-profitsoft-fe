import {
    Grid,
    Card,
    CardContent,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Tooltip,
    Pagination,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Snackbar
} from '@mui/material';
import {useIntl} from "react-intl";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {useSelector} from "react-redux";
import {mockCategories} from "../../../app/constants/mockdata";

// Default filter values
const defaultFilters = {
    categoryId: 0,
    minPrice: undefined,
    maxPrice: undefined,
};

// Number of items per page
const pageSize = 2;

// DishList component
function DishList({ menuPagePath, onFetchDishes, onDeleteDish }) {
    const { formatMessage } = useIntl();
    const [currentPage, setCurrentPage] = useState(() => {
        // Retrieve current page from localStorage or default to 1
        const storedPage = localStorage.getItem('dishListCurrentPage');
        return storedPage ? parseInt(storedPage) : 1;
    });
    const [filter, setFilter] = useState(() => {
        // Retrieve filter from localStorage or use default filter
        const storedFilter = localStorage.getItem('dishListFilter');
        return storedFilter ? JSON.parse(storedFilter) : defaultFilters;
    });
    const [chosenItemId, setChosenItemId] = useState(0);
    const [isConfirmDeleteItemDialogOpen, setIsConfirmDeleteItemDialogOpen] = useState(false);
    const [isShownDeleteBtn, setIsShownDeleteBtn] = useState(false);
    const navigate = useNavigate();

    // Redux state
    const { dishes, totalPages } = useSelector(state => state.menu);

    const [isDishesFetched, setIsDishesFetched] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        setIsDishesFetched(false); // Reset fetch flag on component mount
    }, []);

    // Save filter and pagination settings to localStorage on any changes
    useEffect(() => {
        localStorage.setItem('dishListFilter', JSON.stringify(filter));
        localStorage.setItem('dishListCurrentPage', currentPage.toString());
    }, [filter, currentPage]);

    useEffect(() => {
        // Fetch dishes when filter, page or dishes change
        if (!isDishesFetched) {
            onFetchDishes(filter.categoryId, filter.minPrice, filter.maxPrice, currentPage - 1, pageSize);
            setIsDishesFetched(true);
        }
    }, [filter, currentPage, isDishesFetched, dishes]);

    const handleMouseEnter = (dishId) => {
        setChosenItemId(dishId);
        setIsShownDeleteBtn(true);
    };

    const handleMouseLeave = () => {
        setIsShownDeleteBtn(false);
    };

    const handleDeleteDish = (dishId) => {
        // Delete dish and handle success or failure
        onDeleteDish(dishId)
            .then(() => {
                setSnackbarMessage(formatMessage({ id: 'msg.deleteSuccess' }));
                setIsSnackbarOpen(true);
            })
            .catch(() => {
                setSnackbarMessage(formatMessage({ id: 'msg.deleteFail' }));
                setIsSnackbarOpen(true);
            });

        setIsDishesFetched(false); // Reset fetch flag
        setIsConfirmDeleteItemDialogOpen(false);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        setIsDishesFetched(false); // Reset fetch flag
    };

    const handleFilterChange = (event) => {
        // Update filter state on input change
        const { name, value } = event.target;
        setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    };

    const handleFilterSubmit = () => {
        setCurrentPage(1); // Reset pagination to page 1 when filter is applied
        setIsDishesFetched(false); // Reset fetch flag
    };

    const handleDeleteDialogOpen = () => {
        setIsConfirmDeleteItemDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setIsConfirmDeleteItemDialogOpen(false);
    };

    const handleCreateDishClick = () => {
        navigate(`${menuPagePath}/${0}`);
    };

    return (
        <div container spacing={2}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                <FormControl>
                    <InputLabel>{formatMessage({id: 'field.category'})}</InputLabel>
                    <Select
                        value={filter.categoryId}
                        onChange={handleFilterChange}
                        name="categoryId"
                    >
                        <MenuItem key={0} value={0}>{formatMessage({id: 'txt.category.all'})}</MenuItem>
                        {mockCategories.map(category => (
                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div>
                    <TextField
                        label={formatMessage({id: 'field.minPrice'})}
                        type="number"
                        value={filter.minPrice}
                        onChange={handleFilterChange}
                        name="minPrice"
                        style={{marginRight: '10px'}}
                    />
                    <TextField
                        label={formatMessage({id: 'field.maxPrice'})}
                        type="number"
                        value={filter.maxPrice}
                        onChange={handleFilterChange}
                        name="maxPrice"
                    />
                    <Button variant="outlined" onClick={handleFilterSubmit}>
                        {formatMessage({id: 'btn.applyFilter'})}
                    </Button>
                </div>
                <Button variant="contained" onClick={handleCreateDishClick}>
                    {formatMessage({id: 'msg.item.create'})}
                </Button>
            </div>
            {dishes?.map((dish) => (
                <Grid item xs={12} md={6} key={dish.id}>
                    <Card onMouseEnter={() => handleMouseEnter(dish.id)} onMouseLeave={handleMouseLeave}>
                        <Link to={`${menuPagePath}/${dish.id}`} style={{textDecoration: 'none'}}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {dish.name}
                                </Typography>
                                <Typography>
                                    {formatMessage({id: 'field.category'})}: {dish.category.name}
                                </Typography>
                                <Typography>
                                    {formatMessage({id: 'field.weight'})}: {dish.weight}
                                </Typography>
                                <Typography variant="body2">
                                    {formatMessage({id: 'field.calories'})}: {dish.calories}
                                </Typography>
                                <Typography color="inherit">
                                    {formatMessage({id: 'field.price'})} : {dish.price}
                                </Typography>
                            </CardContent>
                        </Link>
                        {isShownDeleteBtn && chosenItemId === dish.id && (
                            <div>
                                <Tooltip title={formatMessage({id: 'btn.delete.item'})}>
                                    <IconButton onClick={handleDeleteDialogOpen}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        )}
                    </Card>
                </Grid>
            ))}
            <Dialog open={isConfirmDeleteItemDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>{formatMessage({id: 'dlg.text'})}</DialogTitle>
                <DialogContent>{formatMessage({id: 'dlg.warn.text'})}</DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDeleteDish(chosenItemId)} color="primary">
                        {formatMessage({id: 'btn.confirm'})}
                    </Button>
                    <Button onClick={handleDeleteDialogClose} color="secondary">
                        {formatMessage({id: 'btn.cancel'})}
                    </Button>
                </DialogActions>
            </Dialog>
            <Pagination
                style={{position: 'absolute', bottom: '0'}}
                count={totalPages}
                page={currentPage}
                pageSize={pageSize}
                onChange={handlePageChange}
            />
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={6000}
                onClose={() => setIsSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </div>
    );
}

export default DishList;