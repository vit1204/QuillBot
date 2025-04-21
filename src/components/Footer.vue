<script lang="ts" setup>
const FOOTER_API = [
  {
    id: 1,
    title: 'Writing tools',
    contents: [
      'Paraphrasing Tool',
      'Summarizer',
      'QuillBot Flow',
      'Plagiarism Checker',
      'Word Counter',
      'Translator',
      'AI Detector',
    ],
  },

  {
    id: 2,
    title: 'Free Grammar Tools',
    contents: [
      'Grammar Checker',
      'Proofreader',
      'Spell Checker',
      'Punctuation Checker',
      'Essay Checker',
    ],
  },

  {
    id: 3,
    title: 'Citation Generator',
    contents: [
      'Citation Generator',
      'APA Citation Generator',
      'MLA Citation Generator',
    ],
  },
  {
    id: 4,
    title: 'Company',
    contents: [
      'Team',
      'Careers',
      'Help Center',
      'Contact Us',
      'Join Us on Discord',
    ],
  },
  {
    id: 5,
    title: 'Extensions',
    contents: [
      'QuillBot for Chrome',
      'QuillBot for Word',
      'QuillBot for macOS',
    ],
  },

  {
    id: 6,
    title: 'Student Resources',
    contents: [
      'Tools & Videos',
      'Educational Courses',
    ],
  },

  {
    id: 7,
    title: 'Knowledge Base',
    contents: [
      'QuillBot University',
      'Paraphrasing Guide',
      'AI Writing Assistant',
      'QuillBot Blog',
      'Meaning.io',
      'Services',
    ],
  },

  {
    id: 8,
    title: 'Services',
    contents: [
      'Premium',
      'Team Plan',
      'Affiliate',
      'Request a Demo',
    ],
  },
]
</script>

<template>
  <div :class="$style.footerWrapper">
    <div :class="$style.footerInfoWrapper">
      <div :class="$style.footerInfoList">
        <div v-for="info in FOOTER_API" :key="info.id" :class="$style.footerInfoItem">
          <div :class="$style.footerTitle">
            {{ info.title }}
          </div>

          <a v-for="(content, index) in info.contents" :key="index" :class="$style.footerContent">
            {{ content }}
          </a>
        </div>
      </div>

      <div :class="$style.footerInfoContact">
        <div :class="$style.footerTitle">
          Get to know us
        </div>

        <div :class="$style.footerMedias">
          <a href="/" :class="$style.footerLink"><i class="fa-brands fa-linkedin" style="color: #0078d4;" :class="$style.footerIcon" /></a>

          <a href="/" :class="$style.footerLink"><i class="fa-brands fa-facebook" style="color: #0866ff;" :class="$style.footerIcon" /></a>

          <a href="/" :class="$style.footerLink"><i class="fa-brands fa-x-twitter" :class="$style.footerIcon" /></a>

          <a href="/" :class="$style.footerLink"><i class="fa-brands fa-instagram" style="color: #bf1d94;" :class="$style.footerIcon" /></a>
        </div>
      </div>
    </div>

    <div :class="$style.footerTradeMarkWrapper">
      <div :class="$style.footerTradeMarkLeft">
        <div :class="$style.footerTradeMarkTitle">
          QuillBot, a Learneo, Inc. business
        </div>

        <div :class="$style.footerPolicyList">
          <a href="/" :class="$style.footerPolicy">
            Privacy Policy
          </a>

          <div :class="$style.footerPolicyDecoration">
            &nbsp;
          </div>

          <a href="/" :class="$style.footerPolicy">
            Terms of Service
          </a>

          <div :class="$style.footerPolicyDecoration">
            &nbsp;
          </div>

          <a href="/" :class="$style.footerPolicy">
            Copyright, Community Guidelines, DSA and other Legal Resources
          </a>
        </div>

        <div :class="$style.footerTradeMarkTitle">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply
        </div>
      </div>

      <div :class="$style.footerTradeMarkRight">
        <span :class="$style.footerTradeMarkTitle">
          Made with

          <img src="https://assets.quillbot.com/emojis/solid_corn.svg" alt="Assosiate Logo" :class="$style.footerTradeMarkImage">

          at
        </span>

        <a href="/" :class="[$style.footerTradeMarkLink, $style.footerTradeMarkTitle]">UIUC</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
    .footerWrapper {
      background-color: var(--color-background-secondary);
       width: 100%;
       margin-left: 80px;
    }

    .footerInfoWrapper {
      display: flex;
      padding: 52px 68px 52px 68px;
      flex-wrap: nowrap;
      justify-content: space-between;
    }

    .footerInfoList {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 36px;
    }

    .footerInfoItem {
      display: flex;
      flex-direction: column;
    }

    .footerTitle {
      line-height: 24px;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .footerContent {
      font-size: 16px;
      font-weight: 400;
      line-height: 36px;

      &:hover {
        text-decoration: underline;
      }
    }

    .footerInfoContact {
      flex: 0 0 315px;
    }

    .footerMedias {
      display: flex;
      margin-left: -10px;

    }

    .footerLink {
      width: 40px;
      height: 40px;
      text-align: center;
    }

    .footerIcon {
      font-size: 24px;
      position:relative;
      top:50%;
      transform: translateY(-50%);
    }

    .footerTradeMarkWrapper {
      background-color: var(--color-background-third);
      padding: 12px 68px;
      display: flex;
      justify-content: space-between;
    }

    .footerTradeMarkTitle {
      padding-top: 8px;
      line-height: 24px;
      font-size: 14px;
      font-weight: 400;
    }

    .footerPolicyList {
      display: flex;
      align-items: center;
      padding-top: 8px;
    }

    .footerPolicy {
      color: var(--color-font-third);
      font-size: 14px;
      font-weight: 400;
    }

    .footerPolicyDecoration{
      width: 4px;
      height: 4px;
      margin-right: 8px;
      margin-left: 8px;
      background: rgba(0, 0, 0, 0.87);
      border-radius: 50%;
    }

    .footerTradeMarkImage {
      width: 18px;
      height: 18px;
    }

    .footerTradeMarkLink {
      text-decoration: underline;
    }

    @media screen and (max-width: 1000px) {
      .footerInfoWrapper {
        flex-direction: column;
      }
      .footerInfoList {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (max-width: 500px) {
      .footerInfoList {
        grid-template-columns: repeat(1, 1fr);
        gap: 8px;
      }
    }
</style>
