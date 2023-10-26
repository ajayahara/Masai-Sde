import SentimentAnalysis from "./components/Sentiment"
import { FileUpload } from "./components/Summerization"
import ArticleSummarizer from "./components/Summerize"
import TextGenerator from "./components/TextGen"

function App() {
  return (
    <>
      <TextGenerator/>
      <ArticleSummarizer/>
      <FileUpload/>
      <SentimentAnalysis/>
    </>
  )
}

export default App
