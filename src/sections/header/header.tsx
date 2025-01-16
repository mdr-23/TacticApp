import { useThemeContext } from "@/components/theme/theme-context";
import ThemeSwitch from "@/components/theme/theme-switch";
import { useResponsive } from "@/hooks/use-responsive";
import { Box, Stack, Typography, useTheme } from "@mui/material";

export default function Header() {
    const theme = useTheme()
    const isMobile = useResponsive('down', 'sm')
    const { mode } = useThemeContext()

    return (
        <Stack 
            justifyContent={'space-between'} 
            direction={'row-reverse'} 
            px={isMobile ? 2 : 7}
            py={5}
            alignItems={'center'} 
            bgcolor={mode === 'dark' ? theme.palette.primary.darker : theme.palette.primary.light} 
        >
            <Box display={'flex'} justifyContent={'flex-end'}>
                <ThemeSwitch />
            </Box>
            <Typography variant="h3" textAlign={'center'}>
                Kadermeister
            </Typography>
        </Stack>
    )
}