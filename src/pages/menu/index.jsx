import useLocationSearch from "../../misc/hooks/useLocationSearch";
import React, {useMemo} from "react";
import getMessages from "../menu/intl";
import IntlProvider from "../../misc/providers/IntlProvider";
import DishList from "./containers/DishList"

function Index(props) {
    const {
        lang,
    } = useLocationSearch();
    const messages = useMemo(() => getMessages(lang), [lang]);
    return (
        <IntlProvider messages={messages}>
            <DishList {...props} />
        </IntlProvider>
    );
}

export default Index;
