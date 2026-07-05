import type { Metadata } from "next";
import Image from "next/image";
import { ArticleHeader } from "@/components/blog/article-header";

const description =
  "A deep dive into the Advanced Encryption Standard, symmetric key cryptography, and how the algorithm transforms data through its core phases.";

export const metadata: Metadata = {
  title: "Understanding AES Encryption",
  description,
  alternates: { canonical: "/blogs/aes-encryption" },
  openGraph: {
    type: "article",
    title: "Understanding AES Encryption",
    description,
    url: "/blogs/aes-encryption",
    publishedTime: "2026-04-13",
    images: ["/blogs/aes_encryption_diagram.png"],
  },
};

export default function AesEncryptionBlog() {
  return (
    <article className="mx-auto max-w-4xl">
      <ArticleHeader
        slug="aes-encryption"
        title="Understanding AES Encryption: A Deep Technical Dive"
        description={description}
        date="April 13, 2026"
        isoDate="2026-04-13"
        readTime="12 min read"
        tag="Cryptography"
        image="/blogs/aes_encryption_diagram.png"
        imageAlt="AES Encryption Architecture Overview"
        imageFit="cover"
      />

      <div
        className="animate-fade-up text-lg leading-relaxed"
        style={{ animationDelay: "0.15s" }}
      >
          <p className="lead text-xl text-muted-foreground mb-8">
            The Advanced Encryption Standard (AES), established by the U.S. National Institute of Standards and Technology (NIST) in 2001, is a symmetric block cipher chosen to protect classified information. Let&apos;s explore the mathematically elegant mechanics of how it secures the digital world—from WhatsApp messages to banking infrastructure.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">1. Symmetric Key Cryptography Foundation</h2>
          <p className="mb-6">
            AES relies on <strong>symmetric key cryptography</strong>. This means the identical key used to encrypt the plaintext is strictly required to decrypt the ciphertext. Unlike asymmetric cryptography (such as RSA or Elliptic Curve), which involves computationally expensive public-private key pairs, symmetric algorithms are exceptionally fast. This speed makes AES the industry standard for bulk data encryption, operating seamlessly within protocols like TLS/SSL and disk encryption software.
          </p>
          <p className="mb-6">
            Depending on the security requirements, AES operates with three key lengths: <strong>128-bit, 192-bit, or 256-bit</strong>. The larger the key, the exponentially higher the number of possible combinations ($2^{256}$ for AES-256), making brute-force attacks physically impossible given current computational limits.
          </p>

          <h2 className="text-3xl font-bold mt-16 mb-6 text-foreground">2. Under the Hood: The State and the Rounds</h2>
          <p className="mb-6">
            AES doesn&apos;t encrypt data linearly. Instead, it operates on a fixed-size <strong>128-bit block</strong> of data at a time. This block is organized into a 4x4 matrix of bytes known as the <em>state</em>.
          </p>
          <p className="mb-6">
            The algorithm puts this state through multiple rounds of transformations. The number of rounds depends directly on the key length:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 list-none pl-0">
            <li className="bg-muted/50 p-4 rounded-xl border text-center"><strong>AES-128:</strong> 10 Rounds</li>
            <li className="bg-muted/50 p-4 rounded-xl border text-center"><strong>AES-192:</strong> 12 Rounds</li>
            <li className="bg-muted/50 p-4 rounded-xl border text-center"><strong>AES-256:</strong> 14 Rounds</li>
          </ul>
          <p className="mb-10">
            Except for the final round (which omits the MixColumns step), each round consistently executes four specific mathematical operations: <strong>SubBytes, ShiftRows, MixColumns, and AddRoundKey</strong>.
          </p>

          <hr className="my-16 border-border" />

          {/* Phase 1: SubBytes */}
          <h3 className="text-2xl font-bold mt-10 mb-4 text-primary">Phase 1: SubBytes (Confusion)</h3>
          <p className="mb-6">
            The <em>SubBytes</em> step is a non-linear substitution. Every single byte in the 4x4 state matrix is substituted with another byte using a predefined lookup table known as the <strong>Rijndael S-box</strong>.
          </p>
          
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden my-8 border bg-muted shadow-lg">
            <Image
              src="/blogs/aes_subbytes_diagram.png"
              alt="AES SubBytes Transformation"
              fill
              className="object-cover"
            />
          </div>

          <p className="mb-6">
            This substitution is purposefully designed to thwart algebraic attacks. By replacing values non-linearly, AES introduces <strong>confusion</strong>—a cryptographic property coined by Claude Shannon, which dictates that the relationship between the encryption key and the ciphertext should be as complex and opaque as possible.
          </p>

          {/* Phase 2: ShiftRows */}
          <h3 className="text-2xl font-bold mt-12 mb-4 text-primary">Phase 2: ShiftRows (Diffusion)</h3>
          <p className="mb-6">
            While SubBytes operates on individual bytes, <em>ShiftRows</em> operates on the rows of the state matrix. It is a simple transposition step:
          </p>
          <ul className="mb-6 space-y-2">
            <li><strong>Row 0:</strong> Not shifted.</li>
            <li><strong>Row 1:</strong> Shifted cyclically to the left by 1 byte.</li>
            <li><strong>Row 2:</strong> Shifted cyclically to the left by 2 bytes.</li>
            <li><strong>Row 3:</strong> Shifted cyclically to the left by 3 bytes.</li>
          </ul>
          <p className="mb-6">
            This guarantees that the columns are mixed. Without ShiftRows, each column in the state matrix would be encrypted independently, drastically weakening the cipher.
          </p>

          {/* Phase 3: MixColumns */}
          <h3 className="text-2xl font-bold mt-12 mb-4 text-primary">Phase 3: MixColumns (Diffusion)</h3>
          <p className="mb-6">
            <em>MixColumns</em> provides extreme <strong>diffusion</strong>—meaning that changing a single bit of plaintext affects a vast number of bits in the ciphertext.
          </p>

          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden my-8 border bg-muted shadow-lg">
            <Image
              src="/blogs/aes_mixcolumns_diagram.png"
              alt="AES MixColumns Matrix Transformation"
              fill
              className="object-cover"
            />
          </div>

          <p className="mb-6">
            In this step, each column of the state matrix is treated as a four-term polynomial. The column is multiplied by a fixed constant polynomial matrix over the finite field Galois Field $GF(2^8)$. Because of the mathematical properties of this multiplication, the output of any given byte relies on the input of all four bytes in that column. 
          </p>
          <p className="mb-6">
            <em>Note: The final round of AES explicitly skips the MixColumns step to ensure the encryption and decryption processes remain perfectly invertible without adding unnecessary computational overhead.</em>
          </p>

          {/* Phase 4: AddRoundKey */}
          <h3 className="text-2xl font-bold mt-12 mb-4 text-primary">Phase 4: AddRoundKey</h3>
          <p className="mb-6">
            Finally, the <em>AddRoundKey</em> step brings the secret key into play. A &quot;Round Key&quot; is derived from the main encryption key via the AES Key Schedule algorithm. This round key is seamlessly combined with the state matrix using a bitwise XOR (Exclusive OR) operation.
          </p>
          <div className="bg-card text-card-foreground p-6 rounded-xl border font-mono text-sm mb-6">
            State&apos;[i,j] = State[i,j] ⊕ RoundKey[i,j]
          </div>
          <p className="mb-6">
            Because XOR is perfectly invertible, decryption is as simple as XORing the ciphertext with the same round key again.
          </p>

          <hr className="my-16 border-border" />

          <h2 className="text-3xl font-bold mt-10 mb-4 text-foreground">3. Hardware Acceleration & Performance</h2>
          <p className="mb-6">
            Because AES is so ubiquitous, modern CPUs from Intel, AMD, and ARM come equipped with dedicated <strong>AES-NI</strong> (New Instructions). By implementing the algorithm directly onto the silicon hardware, processors can execute AES encryption and decryption at gigabytes per second, using minimal power.
          </p>

          <h2 className="text-3xl font-bold mt-10 mb-4 text-foreground">Conclusion</h2>
          <p className="mb-6">
            The architectural brilliance of AES lies in its elegant simplicity and mathematical rigor. The continuous loops of diffusion (via ShiftRows and MixColumns) combined with non-linear confusion (via SubBytes) ensure that after just a few rounds, the ciphertext appears entirely random. When implemented correctly with secure block modes (like GCM), AES remains unbreakable by any known practical attack, solidifying its place as the bedrock of modern digital security.
          </p>
      </div>
    </article>
  );
}
