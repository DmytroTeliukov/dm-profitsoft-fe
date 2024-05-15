import PageContainer from "./components/PageContainer";
import DishListPage from 'pages/menu';
import React from "react";

const DishList = (props) => {
    return (
        <PageContainer>
            <DishListPage {...props} />
        </PageContainer>
    );
};

export default DishList;
