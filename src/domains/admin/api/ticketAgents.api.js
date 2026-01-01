import axios from "../../../utils/Axios";

export const createTicketAgentApi = (data) => {
  return axios.post(
    "/admin/ticket-agent",
    data
  );
};
