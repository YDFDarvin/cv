import { NextPage } from "next"
import CV from "../components/CV"
import { tCV } from "../types"

const Page: NextPage<tCV<string>> = (props) => <CV {...props}/>

Page.getInitialProps = ({query}) => query as unknown as tCV<string>

export default Page
