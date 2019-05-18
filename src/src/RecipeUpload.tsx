import { produce } from "immer";
import React, { useState } from "react";
import { generate } from "shortid";
import TextForm, { title } from './title.js';
import DescriptionForm, { description } from './description.js';
import firebase from './firebase.js';

interface IngredientList {
  id: string;
  Ingredient: string;
  Measurement: string;
}
interface StepList {
  id: string;
  Step: string;
}
const UploadRecipe = () => {
  var errorMessage = "";
  const [IngredientList, setIngredientList] = useState<IngredientList[]>([
    { id: "5", Ingredient: "Ingredient", Measurement: "Measurement"}
  ]);
  const [StepList, setStepList] = useState<StepList[]>([
    { id: "5", Step: "Steps"}
  ]);
	function writeUserData() {
		var i;
		var tempsteplist = [];
		var tempinglist = [];
		var tempmeaslist = [];
		for (i = 0; i < IngredientList.length; i++) {
		  if (IngredientList[i].Ingredient === ""){
			  errorMessage = "Ingredient fields cannot be blank";
			  return;
		  }
		  tempinglist.push(IngredientList[i].Ingredient);
		  if (IngredientList[i].Measurement === ""){
			  errorMessage = "Measurement fields cannot be blank";
			  return;
		  }
		  tempmeaslist.push(IngredientList[i].Measurement);
		} 
		for (i = 0; i < StepList.length; i++) {
		  if (StepList[i].Step === ""){
			  errorMessage = "Step fields cannot be blank";
			  return;
		  }
		  tempsteplist.push(StepList[i].Step);
		} 
		if (title === ""){
		  errorMessage = "Title field cannot be blank";
		  return;
		}
		if (description === ""){
		  errorMessage = "Description field cannot be blank";
		  return;
		}
		console.log(title);
		console.log(description);
		console.log(JSON.stringify(StepList));
		console.log(JSON.stringify(IngredientList));
		firebase.database().ref('recipes/' + generate()).set({
		  title: title,
		  description: description,
		  steps: tempsteplist,
		  ingredients: tempinglist,
		  measurements: tempmeaslist
		});
	}
  return (
    <div style={{ textAlign: "center" }}>
		<TextForm />
		<DescriptionForm />
		
      <button
        onClick={() => {
          setIngredientList(currentIngredientList => [
            ...currentIngredientList,
            {
              id: generate(),
              Ingredient: "",
              Measurement: "",
            }
          ]);
        }}
      >
        add new ingredient
      </button>
      {IngredientList.map((ing, index) => {
        return (
          <div key={ing.id}>
            <input
              onChange={e => {
                const Ingredient = e.target.value;
                setIngredientList(currentIngredientList =>
                  produce(currentIngredientList, v => {
                    v[index].Ingredient = Ingredient;
                  })
                );
              }}
              value={ing.Ingredient}
              placeholder="Ingredient"
            />

            <input
              onChange={e => {
                const Measurement = e.target.value;
                setIngredientList(currentIngredientList =>
                  produce(currentIngredientList, v => {
                    v[index].Measurement = Measurement;
                  })
                );
              }}
              value={ing.Measurement}
              placeholder="Measurement"
            />
            <button
              onClick={() => {
                setIngredientList(currentIngredientList =>
                  currentIngredientList.filter(x => x.id !== ing.id)
                );
              }}
            >
              
            </button>
          </div>
        );
      })}
		<button
			onClick={() => {
			  console.log({ title });
			}}
		>
			log title
		</button>
		<button
			onClick={() => {
			  console.log({ description });
			}}
		>
			log description
		</button>
      <div>{JSON.stringify(IngredientList, null, 2)}</div>

      

      <button
        onClick={() => {
          setStepList(currentStepList => [
            ...currentStepList,
            {
              id: generate(),
              Step: "",
            }
          ]);
        }}
      >
        add new Step
      </button>
      {StepList.map((ing, index) => {
        return (
          <div key={ing.id}>
            <input
              onChange={e => {
                const Step = e.target.value;
                setStepList(currentStepList =>
                  produce(currentStepList, v => {
                    v[index].Step = Step;
                  })
                );
              }}
              value={ing.Step}
              placeholder="Steps"
            />

            <button
              onClick={() => {
                setStepList(currentStepList =>
                  currentStepList.filter(x => x.id !== ing.id)
                );
              }}
            >
          
            </button>
          </div>
        );
      })}
      <div>
			<button onClick={writeUserData}>
          upload recipe
            </button>
		</div>
	  <div>{JSON.stringify(StepList, null, 2)}</div>
	
      <div>
		<p>{errorMessage}</p>
	  </div>
    </div>
  );

};


export default UploadRecipe;