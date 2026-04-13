"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const algorithmSteps = [
  {
    title: "1. Prime generation",
    description:
      "A cryptographically secure random number generator picks large candidate numbers, and probabilistic primality tests such as Miller-Rabin are used until two strong primes p and q are found.",
  },
  {
    title: "2. Build the modulus",
    description:
      "Multiply the primes to form n = p x q. This modulus becomes part of both keys and defines the arithmetic space used by RSA.",
  },
  {
    title: "3. Compute phi(n)",
    description:
      "For textbook RSA, phi(n) = (p - 1)(q - 1). Real libraries may use Carmichael's function instead, but the idea is the same: we need the size of the invertible set modulo n.",
  },
  {
    title: "4. Choose the public exponent",
    description:
      "Pick e so that gcd(e, phi(n)) = 1. The common choice is 65537 because it is large enough for safety and small enough for fast verification and encryption.",
  },
  {
    title: "5. Compute the private exponent",
    description:
      "Solve d = e^-1 mod phi(n) with the Extended Euclidean Algorithm. This value is secret because it lets us reverse the public-key operation.",
  },
  {
    title: "6. Package the keys",
    description:
      "The public key is (n, e). The private key is (n, d), often with extra CRT values dp, dq, and qInv to speed up decryption and signing.",
  },
];

const realWorldExamples = [
  {
    name: "RSA",
    use: "Encryption, key transport, and digital signatures",
    detail:
      "Security comes from the difficulty of factoring a very large modulus n back into p and q.",
  },
  {
    name: "Elliptic Curve Cryptography",
    use: "TLS, Signal, cryptocurrencies, and compact signatures",
    detail:
      "A random private scalar is chosen, and the public key is produced by scalar multiplication on an elliptic-curve base point.",
  },
  {
    name: "Diffie-Hellman / ECDH",
    use: "Shared secret establishment",
    detail:
      "Each party publishes a public value derived from a private secret, and both sides independently derive the same shared key without sending it directly.",
  },
];

const rsaOperations = [
  {
    title: "Encryption",
    formula: "C = M^e mod n",
    description:
      "Anyone with the public key can transform plaintext M into ciphertext C, but only the private key holder should be able to reverse it safely.",
  },
  {
    title: "Decryption",
    formula: "M = C^d mod n",
    description:
      "The private exponent d undoes the public-key operation because d was chosen as the modular inverse of e.",
  },
  {
    title: "Signing",
    formula: "S = H(M)^d mod n",
    description:
      "The signer applies the private key to a hash of the message, proving possession of the secret key without revealing it.",
  },
  {
    title: "Verification",
    formula: "H(M) = S^e mod n",
    description:
      "Anyone can use the public key to verify that the signature matches the expected digest and was not forged or altered.",
  },
];

export default function AsymmetricCryptographyBlog() {
  return (
    <article className="max-w-4xl mx-auto mt-10 pb-20">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/blogs"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to blogs
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
          <time dateTime="2026-04-13">April 13, 2026</time>
          <span>•</span>
          <span>14 min read</span>
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
            Cryptography
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
          Asymmetric Cryptography Explained: Public Keys, Private Keys, and RSA
        </h1>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-16 border bg-muted shadow-2xl">
          <Image
            src="/blogs/asymmetric-key-flow-diagram.svg"
            alt="Diagram showing how public and private keys are used for confidentiality and digital signatures"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-lg leading-relaxed">
          <p className="lead text-xl text-muted-foreground mb-8">
            Asymmetric cryptography solves one of the hardest problems in
            security: how two parties can communicate securely without first
            sharing the same secret. Instead of a single shared key, it uses a
            mathematically linked pair of keys: one public, one private.
          </p>

          <p className="mb-6">
            The <strong>public key</strong> can be distributed widely. The{" "}
            <strong>private key</strong> must remain secret. What makes the
            system useful is the trapdoor property: the public-key operation is
            easy to perform, but reversing it without the private key is
            computationally infeasible.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">
            1. What asymmetric cryptography is really doing
          </h2>
          <p className="mb-6">
            Asymmetric cryptography is used for three big jobs:
          </p>
          <ul className="mb-8 space-y-2">
            <li>
              <strong>Confidentiality:</strong> encrypt with a public key,
              decrypt with the matching private key.
            </li>
            <li>
              <strong>Authenticity:</strong> sign with a private key, verify
              with the matching public key.
            </li>
            <li>
              <strong>Key exchange:</strong> safely establish a shared secret
              that can later be used with a fast symmetric cipher like AES.
            </li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10 not-prose">
            <div className="rounded-2xl border bg-background/70 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
                Confidentiality
              </p>
              <h3 className="text-2xl font-semibold mb-3">
                Alice locks with Bob&apos;s public key
              </h3>
              <p className="text-muted-foreground leading-7">
                Bob publishes a public key. Alice uses it to encrypt a message.
                Only Bob&apos;s private key can open that ciphertext.
              </p>
            </div>
            <div className="rounded-2xl border bg-background/70 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
                Authenticity
              </p>
              <h3 className="text-2xl font-semibold mb-3">
                Bob signs with his private key
              </h3>
              <p className="text-muted-foreground leading-7">
                Bob signs a digest of the message with his private key. Anyone
                with Bob&apos;s public key can verify it really came from him and
                was not modified.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-14 mb-6 text-foreground">
            2. How the public key and private key are created
          </h2>
          <p className="mb-6">
            The exact process depends on the algorithm. In RSA, both keys are
            derived from the same hidden arithmetic structure. In elliptic curve
            systems, the private key is a random number and the public key is a
            point computed from it. The crucial pattern is the same: generate a
            secret first, then derive a public value that is easy to share but
            hard to invert.
          </p>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden my-8 border bg-muted shadow-lg">
            <Image
              src="/blogs/rsa-key-generation-diagram.svg"
              alt="Flowchart showing the major steps of RSA key generation"
              fill
              className="object-contain"
            />
          </div>

          <p className="mb-6">
            For <strong>RSA</strong>, key generation works like this:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10 not-prose">
            {algorithmSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border bg-card/60 p-5 shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-7">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-card text-card-foreground p-6 rounded-xl border font-mono text-sm mb-8">
            Public key  = (n, e)
            <br />
            Private key = (n, d)
          </div>

          <p className="mb-6">
            That shared modulus <code>n</code> is not the secret. The secret is
            the knowledge needed to derive <code>d</code>, which comes from the
            hidden factorization of <code>n</code>. If an attacker can factor{" "}
            <code>n</code> into <code>p</code> and <code>q</code>, the system is
            broken. That is why RSA uses very large numbers.
          </p>

          <h3 className="text-2xl font-bold mt-12 mb-4 text-primary">
            How ECC key pairs are created
          </h3>
          <p className="mb-6">
            Elliptic Curve Cryptography is conceptually simpler to describe:
          </p>
          <ul className="mb-8 space-y-2">
            <li>
              Pick a random private scalar <code>d</code>.
            </li>
            <li>
              Multiply the curve&apos;s base point <code>G</code> by{" "}
              <code>d</code> to get the public key <code>Q = dG</code>.
            </li>
            <li>
              Publish <code>Q</code> and keep <code>d</code> secret.
            </li>
          </ul>
          <p className="mb-6">
            Recovering <code>d</code> from <code>Q</code> is the elliptic curve
            discrete logarithm problem, which is believed to be hard. This is
            why ECC can often deliver similar security with much smaller keys
            than RSA.
          </p>

          <h2 className="text-3xl font-bold mt-14 mb-6 text-foreground">
            3. Common asymmetric algorithms and where they fit
          </h2>

          <div className="grid grid-cols-1 gap-4 my-10 not-prose">
            {realWorldExamples.map((example) => (
              <div
                key={example.name}
                className="rounded-2xl border bg-background/70 p-5 shadow-sm"
              >
                <h3 className="text-2xl font-semibold mb-2">{example.name}</h3>
                <p className="text-primary font-medium mb-2">{example.use}</p>
                <p className="text-muted-foreground leading-7">
                  {example.detail}
                </p>
              </div>
            ))}
          </div>

          <p className="mb-6">
            In practice, asymmetric algorithms are usually not used to encrypt
            entire files or long chat histories directly. They are slower than
            symmetric ciphers. A common pattern is <strong>hybrid
            cryptography</strong>: use RSA or ECDH to protect a temporary secret
            key, then use AES or ChaCha20 to encrypt the bulk data efficiently.
          </p>

          <h2 className="text-3xl font-bold mt-14 mb-6 text-foreground">
            4. RSA in detail
          </h2>
          <p className="mb-6">
            RSA is the classic example because its structure is visible and easy
            to teach. Real RSA uses very large integers and padding schemes such
            as OAEP and PSS, but the core arithmetic is still the same.
          </p>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden my-8 border bg-muted shadow-lg">
            <Image
              src="/blogs/rsa-encrypt-sign-diagram.svg"
              alt="Diagram showing RSA encryption, decryption, signing, and verification"
              fill
              className="object-contain"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10 not-prose">
            {rsaOperations.map((operation) => (
              <div
                key={operation.title}
                className="rounded-2xl border bg-card/60 p-5 shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {operation.title}
                </h3>
                <div className="rounded-xl bg-muted px-4 py-3 font-mono text-sm mb-3">
                  {operation.formula}
                </div>
                <p className="text-muted-foreground leading-7">
                  {operation.description}
                </p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold mt-12 mb-4 text-primary">
            Worked RSA example with actual numbers
          </h3>
          <p className="mb-6">
            The values below are intentionally tiny so we can calculate them by
            hand. They are <strong>not secure</strong>, but they clearly show
            how the math fits together.
          </p>

          <div className="bg-card text-card-foreground p-6 rounded-xl border font-mono text-sm mb-8 space-y-2">
            <div>p = 61</div>
            <div>q = 53</div>
            <div>n = p x q = 3233</div>
            <div>phi(n) = (61 - 1)(53 - 1) = 3120</div>
            <div>Choose e = 17</div>
            <div>d = 2753 because 17 x 2753 mod 3120 = 1</div>
          </div>

          <p className="mb-6">
            That gives us:
          </p>
          <ul className="mb-8 space-y-2">
            <li>
              <strong>Public key:</strong> <code>(3233, 17)</code>
            </li>
            <li>
              <strong>Private key:</strong> <code>(3233, 2753)</code>
            </li>
          </ul>

          <h3 className="text-2xl font-bold mt-10 mb-4 text-primary">
            Encryption example
          </h3>
          <p className="mb-6">
            Let the plaintext be <code>M = 65</code>.
          </p>
          <div className="bg-card text-card-foreground p-6 rounded-xl border font-mono text-sm mb-8 space-y-2">
            <div>C = M^e mod n</div>
            <div>C = 65^17 mod 3233</div>
            <div>C = 2790</div>
          </div>
          <p className="mb-6">
            So the ciphertext sent across the network is <code>2790</code>.
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4 text-primary">
            Decryption example
          </h3>
          <div className="bg-card text-card-foreground p-6 rounded-xl border font-mono text-sm mb-8 space-y-2">
            <div>M = C^d mod n</div>
            <div>M = 2790^2753 mod 3233</div>
            <div>M = 65</div>
          </div>
          <p className="mb-6">
            The private exponent reverses the public operation and recovers the
            original message.
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4 text-primary">
            Signature example
          </h3>
          <p className="mb-6">
            Suppose the hash of a message is <code>42</code>. Bob signs that
            digest with the private key:
          </p>
          <div className="bg-card text-card-foreground p-6 rounded-xl border font-mono text-sm mb-8 space-y-2">
            <div>S = H(M)^d mod n</div>
            <div>S = 42^2753 mod 3233</div>
            <div>S = 3065</div>
          </div>
          <p className="mb-6">
            Anyone can verify using the public key:
          </p>
          <div className="bg-card text-card-foreground p-6 rounded-xl border font-mono text-sm mb-8 space-y-2">
            <div>H(M) = S^e mod n</div>
            <div>H(M) = 3065^17 mod 3233</div>
            <div>H(M) = 42</div>
          </div>
          <p className="mb-6">
            Because the verified value matches the expected digest, the
            signature is valid.
          </p>

          <h2 className="text-3xl font-bold mt-14 mb-6 text-foreground">
            5. Detailed algorithm summary
          </h2>

          <h3 className="text-2xl font-bold mt-10 mb-4 text-primary">
            RSA key generation algorithm
          </h3>
          <ol className="mb-8 space-y-2">
            <li>Choose large random primes p and q.</li>
            <li>Compute n = p x q.</li>
            <li>Compute phi(n) = (p - 1)(q - 1).</li>
            <li>Choose e such that 1 &lt; e &lt; phi(n) and gcd(e, phi(n)) = 1.</li>
            <li>Compute d such that d x e mod phi(n) = 1.</li>
            <li>Publish (n, e) and keep (n, d) secret.</li>
          </ol>

          <h3 className="text-2xl font-bold mt-10 mb-4 text-primary">
            RSA encryption algorithm
          </h3>
          <ol className="mb-8 space-y-2">
            <li>Encode the plaintext as an integer M in the range 0 to n - 1.</li>
            <li>Apply secure padding such as OAEP in real systems.</li>
            <li>Compute C = M^e mod n.</li>
            <li>Send ciphertext C.</li>
          </ol>

          <h3 className="text-2xl font-bold mt-10 mb-4 text-primary">
            RSA decryption algorithm
          </h3>
          <ol className="mb-8 space-y-2">
            <li>Receive ciphertext C.</li>
            <li>Compute M = C^d mod n.</li>
            <li>Remove the padding structure.</li>
            <li>Decode M back into the original plaintext bytes.</li>
          </ol>

          <h3 className="text-2xl font-bold mt-10 mb-4 text-primary">
            RSA signing and verification algorithm
          </h3>
          <ol className="mb-8 space-y-2">
            <li>Hash the message with a secure hash function.</li>
            <li>Sign the hash using the private key: S = H(M)^d mod n.</li>
            <li>Verify by computing S^e mod n with the public key.</li>
            <li>Accept only if the result matches the expected hash and padding format.</li>
          </ol>

          <h2 className="text-3xl font-bold mt-14 mb-6 text-foreground">
            6. Important security notes
          </h2>
          <ul className="mb-8 space-y-2">
            <li>
              <strong>Never use textbook RSA directly.</strong> Modern systems
              require padding such as OAEP for encryption and PSS for
              signatures.
            </li>
            <li>
              <strong>Use large keys.</strong> Tiny values are useful for
              teaching only. Production RSA commonly uses 2048-bit or 3072-bit
              moduli.
            </li>
            <li>
              <strong>Protect the private key operationally.</strong> If the
              key leaks through malware, logs, backups, or side channels, the
              mathematics no longer helps.
            </li>
            <li>
              <strong>Use asymmetric crypto as part of a system.</strong> TLS,
              SSH, code signing, and messaging protocols combine it with hashes,
              certificates, random number generation, and symmetric encryption.
            </li>
          </ul>

          <h2 className="text-3xl font-bold mt-14 mb-6 text-foreground">
            Conclusion
          </h2>
          <p className="mb-6">
            Asymmetric cryptography works because one direction of the math is
            easy and the reverse direction is hard without secret information.
            That idea gives us public-key encryption, digital signatures, and
            secure key exchange.
          </p>
          <p className="mb-6">
            RSA is the clearest place to see the mechanism: generate two primes,
            derive <code>n</code>, choose <code>e</code>, compute <code>d</code>
            , then use the public key for open operations and the private key
            for secret ones. Once that foundation clicks, the rest of modern
            cryptography becomes much easier to reason about.
          </p>
        </div>
      </m.div>
    </article>
  );
}
