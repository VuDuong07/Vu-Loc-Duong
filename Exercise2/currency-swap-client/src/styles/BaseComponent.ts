import {styled} from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';


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

export {
    StyledMUIMenuItem,
    StyledMUIImg,
    StyledSelectedValue
}