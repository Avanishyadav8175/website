export default function ContentInfoBulletPoint({ text }: { text: string }) {
  return (
    <>
      <span className="text-center">•</span>
      <h3 className="font-medium">{text}</h3>
    </>
  );
}
