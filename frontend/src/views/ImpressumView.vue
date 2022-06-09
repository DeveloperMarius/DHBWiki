<template>
  <div id="impressum">
    <header>
      <nav>
        <router-link to="/" class="logo">
          <img src="../assets/logo.svg" alt="DHBWikiLogo"
        /></router-link>
      </nav>
    </header>
    <main>
      <h1>Impressum</h1>

      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        DHBWiki GmbH<br />
        Musterstraße 111<br />
        Gebäude 44<br />
        90210 Musterstadt
      </p>

      <p>
        Handelsregister: HRB 999999<br />
        Registergericht: Amtsgericht Musterstadt
      </p>

      <p>
        <strong>Vertreten durch:</strong><br />
        Dr. Harry Mustermann<br />
        Luise Beispiel
      </p>

      <p>
        <strong>Vorsitzender des Aufsichtsrats:</strong><br />
        Richard Amtmann
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: +49 (0) 123 44 55 66<br />
        Telefax: +49 (0) 123 44 55 99<br />
        E-Mail: info@dhbwiki.de
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
        DE999999999
      </p>

      <h2>Redaktionell verantwortlich</h2>
      <p>
        Beate Beispielhaft<br />
        Musterstraße 110<br />
        90210 Musterstadt
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
          >https://ec.europa.eu/consumers/odr/</a
        >.<br />
        Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h2>
        Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
      </h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </main>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  background: #171b29;

  nav {
    padding: 1.56vw 7.29vw;
    height: 4.17vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 8vw;
      cursor: pointer;
    }

    .informations {
      text-align: center;
      margin: 0 auto;
    }
  }
}

main {
  background: #171b29;
  padding: 4vw 7.79vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 50vh;
  * {
    text-align: center;
  }
  a {
    all: unset !important;
  }

  embed {
    width: 100%;
    min-height: 35vw;
    margin: 0 auto;
  }
}
</style>
