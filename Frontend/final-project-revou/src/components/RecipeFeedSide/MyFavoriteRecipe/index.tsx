import React, { useState, useEffect } from "react";
import useFetchRecipe from "@/hooks/UseFetchRecipe";
import { RecipeData } from "@/components/RecipesFeeds/AllRecipes";
import ModalRecipe from "@/components/ModalRecipe";
import { Button } from "@/components/ui/button";
import axios from "axios";

import ComplexityLogo from "../../../components/images/svg/levels-svgrepo-com.svg";
import NutriLogo from "../../../components/images/svg/cardlogo/scoreboard-svgrepo-com.svg";
import ServingLoo from "../../../components/images/svg/cardlogo/cover-dish-svgrepo-com.svg";

const MyFavoriteRecipes = ({}) => {
  const [showCount, setShowCount] = useState(4);
  const { recipes } = useFetchRecipe();
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [userRecipes, setUserRecipes] = useState([]);

  const toggleShowMore = () => {
    setShowCount((prevCount) => prevCount + 4);
  };

  const toggleShowLess = () => {
    setShowCount((prevCount) => Math.max(4, prevCount - 4));
  };

  const handleRecipeClick = (recipe: RecipeData) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
    // console.log(setSelectedRecipe);
  };
  const fetchMyFavoriteRecipe = async () => {
    const authToken = localStorage.getItem("access_token");
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.get(
        `http://127.0.0.1:5000/collection/recipes/liked`,
        { headers }
      );
      //   console.log("ini response dari my recipe", response);
      setUserRecipes(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMyFavoriteRecipe();
  }, []);
  return (
    <div className="item-list">
      <h1>My Favorite Recipes</h1>
      <div className=" pr-16 ">
        <div className="grid grid-cols-4 gap-7 px-20 py-10 ">
          {userRecipes && userRecipes.length > 0 ? (
            <>
              {userRecipes.map((recipe, index) => (
                <div
                  className="rounded-xl shadow-md shadow-black cursor-pointer"
                  key={index}
                  onClick={() =>
                    handleRecipeClick(recipe as unknown as RecipeData)
                  }
                >
                  <div className=" h-44 overflow-hidden">
                    <img
                      src={recipe?.attachment}
                      alt=""
                      className="rounded-t-xl object-cover flex"
                    />
                  </div>
                  <div className="flex flex-col pt-2 bg-slate-50 rounded-b-xl p-5  overflow-hidden justify-center items-center gap-10 h-40">
                    <div className="flex justify-center items-center text-center">
                      {recipe?.title}
                    </div>
                    <div className="flex justify-around items-center gap-2">
                      <div className="flex gap-1 justify-center items-center">
                        <img
                          src={ComplexityLogo.src}
                          alt=""
                          className="h-6 w-6"
                        />
                        <div>{recipe?.complexity}</div>
                      </div>
                      <div className="flex gap-2 justify-center items-center">
                        <img src={ServingLoo.src} alt="" className="h-6 w-6" />
                        <div>4 persons</div>
                      </div>
                      <div className="flex gap-2 justify-center items-center">
                        <img src={NutriLogo.src} alt="" className="h-6 w-6" />
                        <div>{recipe?.nutriscore}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
        <div className="px-10 pt-4 flex justify-end items-center gap-2">
          {showCount > 4 && (
            <Button onClick={toggleShowLess} className="text-white">
              Show Less
            </Button>
          )}
          {showCount <
            recipes.filter((recipe) => recipe.type === "WeeklyRecipes")
              .length && (
            <Button onClick={toggleShowMore} className="text-white">
              Show More
            </Button>
          )}
        </div>
        {showModal && selectedRecipe && (
          <ModalRecipe
            recipe={selectedRecipe}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </div>
  );
};

export default MyFavoriteRecipes;
