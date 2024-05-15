import PageContainer from "./components/PageContainer";
import DishDetailPage from "../pages/detail";
import React from "react";

const DishDetail = (props) => {
    return (
        <PageContainer>
            <DishDetailPage {...props} />
        </PageContainer>
    );
};

export default DishDetail;