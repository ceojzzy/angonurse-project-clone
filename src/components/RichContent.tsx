interface RichContentProps {
  content: string;
  isHtml?: boolean;
  className?: string;
}

export const RichContent = ({ content, isHtml = false, className = "" }: RichContentProps) => {
  if (isHtml) {
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    );
  }
  
  return <div className={className}>{content}</div>;
};
