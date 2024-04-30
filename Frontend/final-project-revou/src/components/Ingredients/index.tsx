"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { recipeDetailCards } from "@/data";

interface Props {
  className?: string;
}
const Ingredients: React.FC<Props> = () => {
  const [userInput, setUserInput] = useState(0);

  const handleChange = (event: any) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="flex flex-col mt-10 md:mt-0 ">
      {recipeDetailCards.map((card: any) => (
        <div key={card.id} className="lg:justify-around lg:w-3/4 mb-3">
          <h1 className="flex justify-center items-center text-xl font-bold text-amber-700">
            1. Ingredients
          </h1>
          <div className="flex mt-4 lg:flex gap-2">
            <div>
              <Button
                onChange={handleChange}
                className="rounded-full bg-amber-900"
              >
                -
              </Button>
            </div>
            <div className="items-center">
              <input
                type="number"
                className=" text-white w-12 py-2 text-base rounded-xl pl-5 bg-amber-900"
                defaultValue={card.servings}
              />
            </div>
            <div>
              <Button
                onChange={handleChange}
                className="rounded-full bg-amber-900"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      ))}
      {recipeDetailCards[0].ingredients.map((card: any) => (
        <div
          key={card.id}
          className="flex px-0 w-full justify-between lg:w-3/4 container border-b-2 border-slate-200"
        >
          <div className="flex flex-start justify-start items-center gap-2 py-1">
            <picture>
              <img
                src={card.ingredientsImage}
                alt=""
                className="w-12 h-12 flex rounded-full"
              />
            </picture>
            <p className="text-base font-medium text-amber-900 flex justify-start items-center">
              {card.name}
            </p>
          </div>
          <div className="flex justify-end items-center">
            <h1 className="flex text-base font-semibold justify-end items-center">
              {card.quantity}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ingredients;
