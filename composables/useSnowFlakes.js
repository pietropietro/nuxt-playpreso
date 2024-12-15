export function useSnowflakeStyle() {
    function getSnowflakeStyle(index) {
      const duration = 5 + Math.random() * 10; // Duration between 5 and 15 seconds
      const delay = Math.random() * -20; // Start with a delay to stagger the snowflakes
      const xPos = Math.random() * 100; // Random horizontal position
  
      return {
        animation: `fall ${duration}s linear ${delay}s infinite`,
        left: `${xPos}vw`,
      };
    }
  
    return {
      getSnowflakeStyle,
    };
  }
  