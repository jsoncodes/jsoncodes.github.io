type Props = {
  html: string;
};

export function MDXContent({ html }: Props) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
