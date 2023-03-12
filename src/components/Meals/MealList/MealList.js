import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card.js";
import MealItem from "./MealItem/MealItem";

import style from "./MealList.module.css";

function MealList(props) {
    const [dataGet, setDataGet] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFoundNo, setIsFoundNo] = useState(false);
    const [isErorr, setisErorr] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://http-meals-reactjs-default-rtdb.firebaseio.com/meals.json"
                );
                if (!res.ok) {
                    setIsLoading(false);
                    setisErorr(true);
                    return;
                }
                const data = await res.json();
                if (!data) {
                    setIsLoading(false);
                    setIsFoundNo(true);
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
            } catch (error) {
                setIsLoading(false);
                setisErorr(true);
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const mealList = () => {
        console.log(dataGet.length);

        if (isLoading) {
            return <p className={style.loading}>Loading...</p>;
        }
        if (isFoundNo) {
            return <p className={style.loading}>Found no</p>;
        }
        if (isErorr) {
            return <p className={style.loading}>Error...</p>;
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
