import ArticleSummarizer from "./components/Summerize"
import TextGenerator from "./components/TextGen"
import TranslationApp from "./components/Translate"

const App = () => {
  return (
    <>
      <TextGenerator/>
      <ArticleSummarizer />
      <TranslationApp />
    </>
  )
}

export default App