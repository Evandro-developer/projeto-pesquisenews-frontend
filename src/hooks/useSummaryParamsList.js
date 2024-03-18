import { useContext, useEffect, useState } from "react";
import { LangContext } from "../contexts/LanguageContext";

const useSummaryParamsList = () => {
  const { t } = useContext(LangContext);
  const [summaryParamsList, setSummaryParamsList] = useState([]);

  useEffect(() => {
    const summaryParams = t("analyticalSummaryParams", { returnObjects: true });
    const flattenSummaryParams = [];

    const flattenObject = (obj) => {
      Object.values(obj).forEach((value) => {
        if (typeof value === "object") {
          flattenObject(value);
        } else {
          flattenSummaryParams.push(value);
        }
      });
    };

    flattenObject(summaryParams);
    setSummaryParamsList(flattenSummaryParams);
  }, [t]);

  return summaryParamsList;
};

export default useSummaryParamsList;
