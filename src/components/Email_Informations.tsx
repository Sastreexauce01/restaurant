import * as React from "react";
import { User as userType } from "@/generated/prisma";


interface userProps {
  user: userType;
  downloadUrl: string;
}

// export  function EmailTemplate({ user, downloadUrl }: userProps) {
//   return (
//     <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 text-gray-800 font-sans">
//       <h1 className="text-2xl font-semibold mb-4">Bonjour {user.fullName},</h1>

//       <p className="mb-3">
//         Nous vous remercions pour votre inscription. Celle-ci a bien été
//         enregistrée.
//       </p>

//       <p className="mb-3">
//         Vous pouvez télécharger le document PDF contenant les détails de votre
//         enregistrement en cliquant sur le bouton ci-dessous :
//       </p>

//       <div className="text-center my-6">
//         <Button asChild size="lg">
//           <Link href={downloadUrl}>
//             <span>S&apos;inscrire</span>
//           </Link>
//         </Button>
//       </div>

//       <p>Si vous avez des questions, n’hésitez pas à nous contacter.</p>

//       <p className="mt-8 text-sm text-gray-500">
//         Bien cordialement,
//         <br />
//         L’équipe de support
//       </p>
//     </div>
//   );
// }


export function EmailTemplate({ user, downloadUrl }: userProps) {
  return (
    <div>
      <h2>Bonjour {user.fullName},</h2>
      <p>
        Merci pour votre inscription. Cliquez sur ce lien pour télécharger votre
        document :
      </p>
      <p>
        <a href={downloadUrl}>Télécharger le PDF</a>
      </p>
      <p>Bien cordialement, <br /> L’équipe de support</p>
    </div>
  );
}
