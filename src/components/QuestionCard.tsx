import type { Question } from "../types";

interface Props {
  question: Question;
  onSelect: (optionIndex: number) => void;
}

export default function QuestionCard({ question, onSelect }: Props) {
  return (
    <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"12px",padding:"1.25rem"}}>
      <p style={{fontSize:"13px",color:"var(--color-text-secondary)",marginBottom:"8px"}}>Q{question.id}</p>
      <p style={{fontSize:"16px",fontWeight:500,color:"var(--color-text-primary)",marginBottom:"1.25rem",lineHeight:1.6}}>{question.text}</p>
      {question.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{display:"block",width:"100%",textAlign:"left",padding:"12px 16px",marginBottom:"8px",border:"0.5px solid var(--color-border-secondary)",borderRadius:"8px",background:"var(--color-background-primary)",color:"var(--color-text-primary)",fontSize:"14px",cursor:"pointer"}}
          onMouseEnter={(e) => {
            (e.currentTarget).style.background = "#EEEDFE";
            (e.currentTarget).style.borderColor = "#534AB7";
            (e.currentTarget).style.color = "#3c3489";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget).style.background = "var(--color-background-primary)";
            (e.currentTarget).style.borderColor = "var(--color-border-secondary)";
            (e.currentTarget).style.color = "var(--color-text-primary)";
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}