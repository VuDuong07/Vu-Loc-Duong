import {styled} from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';



const flexStyles = (justifyContent: string) => ({
    display: "flex",
    justifyContent,
    alignItems: "center",
});

const StyledMUIMenuItem = styled(MenuItem)(() => ({
    ...flexStyles("start"),

}))

const StyledMUIImg = styled("img")(() => ({
    width: 17,
    height: 17,
    marginLeft: 5,

}))

const StyledSelectedValue = styled("div")(() => ({
    ...flexStyles("center"),
}))

const StyledMUIBox = styled(Box)(() => ({
    width: '30%',
    margin: '0 auto', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 10
}))

const StyledMUIWrapText = styled(Box)(() => ({
   marginTop: 2,
   padding: 8,
   border: "1px solid #e0e0e0",
   borderRadius: 6,
   backgroundColor: "#f5f5f5"
}))

export {
    StyledMUIMenuItem,
    StyledMUIImg,
    StyledSelectedValue,
    StyledMUIBox,
    StyledMUIWrapText
}