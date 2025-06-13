import Wrapper from "@/components/Wrapper";
import { Check } from "lucide-react";
import React from "react";


const page = () => {
  return (
    <Wrapper>
      <div className=" min-h-screen p-32  ">
        <div className=" p-32  bg-muted-foreground flex flex-row justify-center items-center  gap-15">
          <div className=" ">
            <h2 className=" font-semibold  text-4xl ">
              Restau<span className="text-primary">Manager</span>
            </h2>
            <div className="flex flex-col  ">
              <p className="flex flex-row">
                <Check />
                Gestion des commandes
              </p>
              <p className="flex flex-row">
                <Check />
                Gestion des commandes
              </p>
              <p className="flex flex-row">
                <Check />
                Gestion des commandes
              </p>
            </div>
          </div>

          <div className=" bg-card p-16 w-2/3 ">
           <h2>Souscrire à RestauManager</h2>
           
        
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default page;



