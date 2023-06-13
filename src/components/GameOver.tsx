import { Text } from "@mantine/core";

interface GameOverProps {
  show: boolean;
}

export function GameOver({ show }: GameOverProps) {
  if (!show) return null;
  return (
    <Text
      sx={{
        fontSize: 30,
        fontFamily: "'Press Start 2P'",
        textAlign: "center",
        position: "absolute",
        top: "45%",
        color: "white",
        width: "100%",
      }}
    >
      Game Over
    </Text>
  );
}

// top: 43.2%;
// left: 50%;
// transform: translate(-50%, -50%);
// color: white;
// font-size: 35px;
