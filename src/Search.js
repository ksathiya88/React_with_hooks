import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  useRef,
} from "react";
import LoadingIndicator from "./UI/LoadingIndicator";
import ErrorModal from "./UI/ErrorModal";
import Card from "./UI/Card";
import Axios from "axios";

const httpReducer = (intialState, actions) => {
  switch (actions.type) {
    case "pending":
      return { loading: true, error: "" };
    case "completed":
      return { loading: false, error: "" };
    case "error":
      return { loading: false, error: actions.payload };
    case "clear":
      return { loading: false, error: "" };
  }
};

const Search = (props) => {
  const [useFilter, setFilter] = useState("");
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(1);
  const [state, dispatch] = useReducer(httpReducer, {
    loading: false,
    error: "",
  });
  const ref1 = useRef();

  useEffect(() => {
    dispatch({ type: "pending" });

    const timer = setTimeout(() => {
      console.log("value1", useFilter);
      console.log("value2", ref1.current.value);
      if (useFilter == ref1.current.value) {
        Axios.get("http://localhost:8081/getEmployees/").then(
          (employees) => {
            dispatch({ type: "completed" });
            console.log("hello", employees);
            props.setEmployees(employees.data);
          },
          (error) => {
            dispatch({ type: "error", payload: error.message });
          }
        );
      }
    }, 500);
    //);
    return () => {
      clearTimeout(timer);
    };
  }, [useFilter]);

  const callback = useCallback(() => {
    console.log("Callback called");
  }, []);

  const sum = useMemo(() => {
    console.log("Sum called");
    return value1 + value2;
  }, [value1, value2, callback]);

  return (
    <section className="search">
      <Card>
        <label> Enter Name to Filter</label>
        <input
          type="text"
          value={useFilter}
          ref={ref1}
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        ></input>
        <input
          type="text"
          value={value1}
          onChange={(event) => {
            setValue1(event.target.value);
          }}
        ></input>
        <input
          type="text"
          value={value2}
          onChange={(event) => {
            setValue2(event.target.value);
          }}
        ></input>
        <label>Sum</label>:{sum}
      </Card>
      {state.loading && <LoadingIndicator></LoadingIndicator>}
      {state.error && <ErrorModal
          onClose={() => {
            dispatch({ type: "CLEAR" });
          }}}
    </section>
  );
};

export default Search;
