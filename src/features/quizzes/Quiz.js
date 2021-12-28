import { Link, useParams } from "react-router-dom";
import Card from "../cards/Card";
import ROUTES from "../../app/routes";
import { useSelector } from "react-redux";
import { selectQuizzes } from "./quizzesSlice";

export default function Topic() {
  const quizzes = useSelector(selectQuizzes); // replace this with a call to your selector to get all the quizzes in state
  let { quizId } = useParams();
  // for the line above, remember in App.js:
  /*
    <Route path={`${match.path}/:quizId`}>
          <Quiz />
        </Route>
  */

  /*useParams returns:
    an object of key/value pairs of URL parameters. Use it to access match.params of the current <Route>.*/
  const quiz = quizzes[quizId];

  return (
    <section>
      <h1>{quiz.name}</h1>
      <ul className="cards-list">
        {quiz.cardIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
