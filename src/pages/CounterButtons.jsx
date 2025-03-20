import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByAmount } from '../redux/createSlice';
import { Box, Button, Typography } from '@mui/material';

const CounterButtons = () => {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value);

  return (
    <Box sx={{ml: 40}}>
      <Typography>Count: {count}</Typography>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      <Button onClick={() => dispatch(incrementByAmount(5))}>Increase by 5</Button>
    </Box>
  );
};
export default CounterButtons;