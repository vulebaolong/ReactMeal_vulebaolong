import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card.js";
import MealItem from "./MealItem/MealItem";

import style from "./MealList.module.css";

function MealList(props) {
    const [dataGet, setDataGet] = useState([]);
    const [isLoading, setIsLoading] = useState("Loading...");
    const [isFoundNo, setIsFoundNo] = useState(false);
    const [isErorr, setisErorr] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                // "https://http-meals-reactjs-default-rtdb.firebaseio.com/meal.json" //data.length = 0
                // "https://http-meals-reactjs-default-rtdb.firebaseio.com/meals.jso" //erroe
                "https://http-meals-reactjs-default-rtdb.firebaseio.com/meals.json" //success
            );
            if (!res.ok) {
                throw new Error("Something went wrong");
            }
            const data = await res.json();
            if (!data) {
                setisErorr(false);
                setIsLoading(false);
                setIsFoundNo("Found no ....");
                return;
            }

            console.log(data);

            const dataResult = [];
            for (const key in data) {
                dataResult.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                });
            }
            setDataGet(dataResult);
            setIsLoading(false);
            setisErorr(false);
            setIsFoundNo(false);
        };

        fetchData().catch((error) => {
            setIsLoading(false);
            setisErorr(error.message);
            setIsFoundNo(false);
        });
    }, []);

    const mealList = () => {
        console.log(dataGet.length);

        if (isLoading) {
            return <p className={style.loading}>{isLoading}</p>;
        }
        if (isFoundNo) {
            return <p className={style.loading}>{isFoundNo}.</p>;
        }
        if (isErorr) {
            return <p className={style.loading}>{isErorr}</p>;
        }
        const mealList = dataGet.map((meal) => (
            <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        ));
        return mealList;
    };

    return (
        <section className={style.meal_list}>
            <Card>
                <ul>{mealList()}</ul>
            </Card>
        </section>
    );
}

export default MealList;
