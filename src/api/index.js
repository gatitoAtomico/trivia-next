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

      let results = response.data.results;

      //Use the filter method to remove objects with category 'Entertainment: Video Games'
      const filteredResults = results?.filter(
        (result) => result.category !== "Entertainment: Video Games"
      );

      //Sort the filteredResults array by category
      filteredResults?.sort((a, b) => a.category.localeCompare(b.category));
      return filteredResults;
    } catch (error) {
      console.error("Error fetching quiz:", error);
      throw error;
    }
  },
  storeQuizInfo: async ({
    full_name,
    email,
    number_of_questions,
    difficulty,
    type,
  }) => {
    const apiUrl = process.env.REACT_APP_SERVER_REQUEST;

    try {
      await axios.post(`${apiUrl}/updateTriviaHistory`, {
        full_name,
        email,
        number_of_questions,
        difficulty,
        type,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default trivia;
