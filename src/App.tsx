import React, { useState, useEffect } from "react";
import RecipeTagList from "./RecipeTagList";
import RecipeList from "./RecipeList";

const App: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch("https://dummyjson.com/recipes/tags");
      const data = await response.json();
      setTags(data); 
    };
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      const fetchRecipes = async () => {
        const response = await fetch(`https://dummyjson.com/recipes/tag/${selectedTag}`);
        const data = await response.json();
        setRecipes(data.recipes); 
      };
      fetchRecipes();
    }
  }, [selectedTag]);

  const handleTagSelect = (tagName: string) => {
    setSelectedTag(tagName);
  };

  const handleBackToTags = () => {
    setSelectedTag(null);
  };

  return (
    <div>
      <h1>ACME Recipe O'Master</h1>
      {selectedTag ? (
        <div>
          <button onClick={handleBackToTags}>Back to Tags</button>
          <RecipeList recipes={recipes} />
        </div>
      ) : (
        <RecipeTagList tagList={tags} onSelectTag={handleTagSelect} />
      )}
    </div>
  );
};

export default App;
