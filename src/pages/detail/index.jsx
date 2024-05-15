import useLocationSearch from "../../misc/hooks/useLocationSearch";
import React, {useMemo} from "react";
import getMessages from "../detail/intl";
import IntlProvider from "../../misc/providers/IntlProvider";
import DishDetail from "../detail/containers/DishDetail";

function Index(props) {
    const {
        lang,
    } = useLocationSearch();
    const messages = useMemo(() => getMessages(lang), [lang]);
    return (
        <IntlProvider messages={messages}>
            <DishDetail {...props} />
        </IntlProvider>
    );
}

export default Index;
