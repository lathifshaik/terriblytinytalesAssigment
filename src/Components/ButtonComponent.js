import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import ExportButton from "./Exportbutton";

const ButtonComponent = () => {
  const [data, setData] = useState("");
  const [topWords, setTopWords] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://www.terriblytinytales.com/test.txt"
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const parseText = (text) => {
    // Remove any special characters from the text and convert to lowercase
    const cleanedText = text.replace(/[^\w\s]/gi, "").toLowerCase();
    // Split the text into an array of words
    const wordsArray = cleanedText.split(" ");
    // Create an object to store the frequency of each word
    const frequency = {};
    // Loop through the array of words and update the frequency object
    wordsArray.forEach((word) => {
      if (frequency[word]) {
        frequency[word] += 1;
      } else {
        frequency[word] = 1;
      }
    });
    // Sort the frequency object by count in descending order
    const sortedFrequency = Object.entries(frequency).sort(
      (a, b) => b[1] - a[1]
    );
    // Take the top 20 words
    const topWords = sortedFrequency.slice(0, 20);
    // Update the state with the top words and their frequency
    setTopWords(topWords);
  };

  useEffect(() => {
    if (data) {
      parseText(data);
    }
  }, [data]);

  useEffect(() => {
    // Create a new Chart instance
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: topWords.map((word) => word[0]),
        datasets: [
          {
            label: "Word Frequency",
            data: topWords.map((word) => word[1]),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    // Cleanup the chart when component unmounts
    return () => {
      chart.destroy();
    };
  }, [topWords]);

  return (
    <div>
      <div>
        <div>
        </div>
      </div>
      <div id ='Submit' style={{float: 'right' }}>
      <button onClick={fetchData}>Submit</button>
      </div>
      <div>
        <div></div>
        <canvas id="myChart"style={{ height: 120, width:'auto'}}></canvas>
        <ExportButton topWords={topWords} />
      </div>
    </div>
  );
};

export default ButtonComponent;
