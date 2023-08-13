  import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import styled from "styled-components";


const Header = ({ title, subtitle,onAddTaskClick  }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <HeaderContainer>
      <AddTaskButton onClick={onAddTaskClick}>Add Task</AddTaskButton>
    </HeaderContainer>
    <Box mb="30px">

      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>

      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
        </>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px;
 `;
 


const AddTaskButton = styled.button`
  background-color: #ebecf0;
  border-radius: 3px;
  border: none;
  color: #6b808c;
  font-size: 14px;
  padding: 8px;
  text-align: left;
`;

export default Header;
