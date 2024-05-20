import { getSeedsClassification } from "../../services/classification";

export const getClassificationsHandler = async () => {
  const classifications = await getSeedsClassification();
  return classifications;
};
