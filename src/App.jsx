import { useState } from 'react';
import './App.css';
import Flashcard from './Flashcard';

function App() {
  const Flashcards = [
    {
      id: 1,
      question: 'How many Ballon d\'Ors does Lionel Messi have?',
      answer: '8'
    },
    {
      id: 2,
      question: 'Which soccer club has the most Champions Leagues?',
      answer: 'Real Madrid'
    },
    {
      id: 3,
      question: 'Where was the last World Cup held?',
      answer: 'Qatar'
    },
    {
      id: 4,
      question: 'Which country is Cristiano Ronaldo from?',
      answer: 'Portugal'
    },
    {
      id: 5,
      question: 'Which country has the most World Cups?',
      answer: 'Brazil'
    },
    {
      id: 6,
      question: 'Which country won the first-ever FIFA World Cup in 1930?',
      answer: 'Uruguay'
    },
    {
      id: 7,
      question: 'Which country has won the most FIFA Women\'s World Cup titles?',
      answer: 'USA'
    },
    {
      id: 8,
      question: 'What is the name of the Spanish football rivalry between Real Madrid and Barcelona?',
      answer: 'El-Clásico'
    },
    {
      id: 9,
      question: 'Who was the youngest player to score in a FIFA World Cup final?',
      answer: 'Pelé (at 17 years old)'
    },
    {
      id: 10,
      question: 'Which country hosted the 1994 FIFA World Cup?',
      answer: 'USA'
    },
  ];

  const [count, setCount] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [random, setRandom] = useState(Mix(0, Flashcards.length));
  const [wrong, setWrong] = useState(''); 
  const [correct, SetCorrect] = useState('');
  
  function Mix(min, max) {
    let numbers = [];
    for (let i = min; i <= max - 1; i++) {
      numbers.push(i);
    }
    let result = [];
    while (result.length < max) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const randomNumber = numbers[randomIndex];
      result.push(randomNumber);
      numbers.splice(randomIndex, 1);
    }
    return result;
  }

  const Back = () => {
    if (count > 0) {
      setCount(count - 1);
      setFlipped(false);
      setWrong(''); 
      SetCorrect(''); 
    }
  };

  const Next = () => {
    if (count < Flashcards.length - 1) {
      setCount(count + 1);
      setFlipped(false);
      setWrong(''); 
      SetCorrect(''); 
    }
  };

  const Shuffle = () => {
    setRandom(Mix(0, Flashcards.length));
    setFlipped(false);
    setCount(0);
    setWrong(''); 
    SetCorrect(''); 
  };

  function isSimilar(guess, answer) {
    guess = guess.toLowerCase().trim();
    answer = answer.toLowerCase().trim();

    let matchingCount = 0;
    for (let i = 0; i < Math.min(guess.length, answer.length); i++) {
      if (guess[i] === answer[i]) {
        matchingCount++;
      }
    }

    const similarityPercentage = (matchingCount / answer.length) * 100;
    if (guess.length >= answer.length + 3) {
      return false;
    } else {
      return similarityPercentage >= 70;
    }
  }

  const checks = (event) => {
    event.preventDefault();
    const guess = wrong; 
    const answer = Flashcards[random[count]].answer; 
    console.log(guess, answer);
    if (isSimilar(guess, answer)) {
      SetCorrect('correct');
    } else {
      SetCorrect('wrong');
    }
  };

  const handleInputChange = (event) => {
    setWrong(event.target.value); 
  };

  return (
    <>
      <div className="bg-[url('https://i.etsystatic.com/38660474/r/il/12429e/4352455753/il_fullxfull.4352455753_jinn.jpg')] bg-cover bg-center fixed inset-0 flex flex-col justify-center items-center text-center min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl text-white font-bold font-serif mb-10">
            Soccer Trivia Questions
          </h1>
          <h4 className="text-white mb-6 font-serif">
            How good is your soccer knowledge? Test your knowledge about soccer here!
          </h4>
          <h4 className="text-white mb-6 font-serif">Number of Flashcards: 10</h4>
          <Flashcard
            id={Flashcards[count].id}
            question={Flashcards[random[count]].question}
            answer={Flashcards[random[count]].answer}
            flipped={flipped}
            setFlipped={setFlipped}
          />
        </div>
        <div className="mt-1 mb-8">
          <form>
            <input
              type="text"
              value={wrong} 
              onChange={handleInputChange} 
              placeholder="Enter a guess!"
              id={correct}
              className={`px-4 py-2 ${correct === 'correct' ? 'bg-green-500' : correct === 'wrong' ? 'bg-red-500' : 'bg-gray-500'} text-white rounded`}
            />
            <button
              onClick={checks}
              className="mx-8 bg-blue-500 text-white rounded-md w-24 font-serif"
            >
              Check
            </button>
          </form>
          <div className="mt-10 space-x-4">
            <button onClick={Back} className="px-4 py-2 bg-blue-500 text-white rounded">
              Back
            </button>
            <button onClick={Next} className="px-4 py-2 bg-blue-500 text-white rounded">
              Next
            </button>
            <button onClick={Shuffle} className="px-4 py-2 bg-blue-500 text-white rounded">
              Shuffle
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
