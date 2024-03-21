import { useEffect, useState } from "react";
import useLang from "./useLang";

const useSummaryParamsList = () => {
  const { t } = useLang();
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
