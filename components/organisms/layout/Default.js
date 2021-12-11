import { Container } from "@chakra-ui/react"

const DefaultLayout = ({ children }) => {
  return <Container maxW="2xl" position="relative">{children}</Container>
}

export default DefaultLayout