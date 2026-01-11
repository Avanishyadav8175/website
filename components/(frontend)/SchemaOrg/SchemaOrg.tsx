import generateSchemaOrg from "./helpers/generateSchema";
import { SchemaOrgDefaultsType, SchemaOrgGeneratorType } from "./static/types";

export default function SchemaOrg({
  schemaOrgData,
  schemaOrgDefaults
}: {
  schemaOrgData: SchemaOrgGeneratorType;
  schemaOrgDefaults: SchemaOrgDefaultsType;
}) {
  const jsonLD = generateSchemaOrg({
    props: schemaOrgData,
    DEFAULTS: schemaOrgDefaults
  });

  return (
    <>
      {jsonLD.map((jsonLd, index) => (
        <script
          type="application/ld+json"
          key={index}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />
      ))}
    </>
  );
}
