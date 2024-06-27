import PageContainer from "./components/PageContainer";
import DishDetailPage from "../pages/detail";
import React from "react";
import PageAccessValidator from "./components/PageAccessValidator";
import * as authorities from "../constants/authorities";

const DishDetail = (props) => {
    return (
        <PageAccessValidator
        >
            <PageContainer>
                <DishDetailPage {...props} />
            </PageContainer>
        </PageAccessValidator>
    );
};

export default DishDetail;