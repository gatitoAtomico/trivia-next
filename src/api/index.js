import axios from "axios";

const trivia = {
  getQuiz: async ({ amount, difficulty, type }) => {
    try {
      const params = {
        amount,
        difficulty,
        type,
      };

      if (type === "") {
        delete params.type;
      }

      const response = await axios.get("https://opentdb.com/api.php", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching quiz:", error);
      throw error;
    }
  },
};

export default trivia;
