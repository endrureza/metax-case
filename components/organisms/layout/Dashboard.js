import { Grid, GridItem } from "@chakra-ui/react";
import { Nav } from "@/components/molecules";

const DashboardLayout = ({ children }) => {
  return (
    <Grid templateColumns="250px 1fr" gap={10} maxH="full" maxW="250px">
      <GridItem backgroundColor="gray.200" textColor="gray.600" h="100vh">
        <Nav />
      </GridItem>
      <GridItem py={6}>{children}</GridItem>
    </Grid>
  );
};

export default DashboardLayout;
