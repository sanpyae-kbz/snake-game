import { Box, Button, Center, Flex } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import dotImg from "./assets/apple.png";
import { GameOver } from "./components/GameOver";
import useInterval from "./hooks/useInterval";

const canvasX = 1000;
const canvasY = 1000;
const layout = window.innerWidth > 500 ? 500 : window.innerWidth;
const initialSnake = [
  [4, 10],
  [4, 10],
];
const initialFood = [14, 10];
const scale = 50;
const timeDelay = 100;

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState(initialSnake);

  useInterval(() => runGame(), delay);

  useEffect(() => {
    const dot = document.getElementById("dot") as HTMLCanvasElement;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "green";
        snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));
        ctx.drawImage(dot, food[0], food[1], 1, 1);
      }
    }
  }, [snake, food, gameOver]);

  function start() {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection([1, 0]);
    setDelay(timeDelay);
    setScore(0);
    setGameOver(false);
  }

  function checkCollision(head: number[]) {
    for (let i = 0; i < snake.length; i++) {
      if (head[i] < 0 || head[i] * scale >= canvasX) return true;
    }
    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) return true;
    }
    return false;
  }

  function foodAte(newSnake: number[][]) {
    const coord = food.map(() => Math.floor((Math.random() * canvasX) / scale));
    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      const newFood = coord;
      setScore(score + 1);
      setFood(newFood);
      return true;
    }
    return false;
  }

  function runGame() {
    const newSnake = [...snake];
    const newSnakeHead = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ];
    newSnake.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) {
      setDelay(null);
      setGameOver(true);
    }
    if (!foodAte(newSnake)) {
      newSnake.pop();
    }
    setSnake(newSnake);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.key);
    switch (e.key) {
      case "ArrowLeft":
        setDirection([-1, 0]);
        break;
      case "ArrowUp":
        setDirection([0, -1]);
        break;
      case "ArrowRight":
        setDirection([1, 0]);
        break;
      case "ArrowDown":
        setDirection([0, 1]);
        break;
      case "Enter":
        start();
        break;
    }
  };

  return (
    <Box onKeyDown={handleKeyDown}>
      <Box
        component="img"
        src={dotImg}
        id="dot"
        w={30}
        h={30}
        sx={{ display: "none" }}
      />
      <Center>
        <Flex direction="column">
          <Box pos="relative">
            <GameOver show={gameOver} />
            <Box
              bg="#000"
              w={layout}
              h={layout}
              component="canvas"
              ref={canvasRef}
              width={`${canvasX}px`}
              height={`${canvasY}px`}
            />
          </Box>
          <Button onClick={start} mt={20}>
            Start
          </Button>
        </Flex>
      </Center>
      <Center>
        <Button.Group>
          <Button onClick={() => setDirection([-1, 0])} mt={20}>
            Left
          </Button>
          <Button onClick={() => setDirection([0, -1])} mt={20}>
            UP
          </Button>
          <Button onClick={() => setDirection([1, 0])} mt={20}>
            Right
          </Button>
          <Button onClick={() => setDirection([0, 1])} mt={20}>
            Down
          </Button>
        </Button.Group>
      </Center>
    </Box>
  );
}

export default SnakeGame;
