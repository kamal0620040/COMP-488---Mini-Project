"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Home = () => {
  const [news, setNews] = useState("");
  const [modelType, setModelType] = useState("RNN");
  const [predictionResult, setPredictionResult] = useState(null);

  const handleTextareaChange = (event) => {
    setNews(event.target.value);
  };

  // Function to handle the button click and send the POST request
  const handleButtonClick = () => {
    // Prepare the data in the required format
    const postData = {
      model: modelType.toLowerCase(),
      news: news,
    };

    console.log(postData);

    // Make a POST request to the server
    fetch("http://127.0.0.1:8000/predict/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data as needed
        console.log("Prediction result:", data);
        setPredictionResult(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="flex flex-col items-start mb-6">
        <p className="mb-3 font-semibold">Select Mode:</p>
        <DropdownMenu className="bg-black">
          <DropdownMenuTrigger className="outline-dashed px-10 rounded-sm">
            {modelType}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white ml-14">
            <DropdownMenuLabel>Model Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:bg-red-400 hover:text-white hover:cursor-pointer"
              onClick={() => {
                setModelType("RNN");
              }}
            >
              RNN
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-red-400 hover:text-white hover:cursor-pointer"
              onClick={() => {
                setModelType("LSTM");
              }}
            >
              LSTM
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-red-400 hover:text-white hover:cursor-pointer"
              onClick={() => {
                setModelType("GRU");
              }}
            >
              GRU
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="mb-3 font-semibold">Enter your News:</p>
      <Textarea
        className="text-gray-600 p-6"
        value={news}
        onChange={handleTextareaChange}
        placeholder="Type something..."
      />
      <div className="w-full flex justify-center">
        <Button className="mt-4" onClick={handleButtonClick}>
          Predict
        </Button>
      </div>
      {predictionResult && (
        <div>
          The News is:{" "}
          {predictionResult.predictions[0] > 0.5 ? (
            <span>Fake</span>
          ) : (
            <span>True</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
