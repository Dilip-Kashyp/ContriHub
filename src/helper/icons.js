export const getDeviconUrl = (lang) => {
  const map = {
    javascript: "javascript/javascript-original.svg",
    typescript: "typescript/typescript-original.svg",
    python: "python/python-original.svg",
    go: "go/go-original.svg",
    rust: "rust/rust-original.svg",
    java: "java/java-original.svg",
    cpp: "cplusplus/cplusplus-original.svg",
    "c++": "cplusplus/cplusplus-original.svg",
    ruby: "ruby/ruby-original.svg",
    php: "php/php-original.svg",
    swift: "swift/swift-original.svg",
    "c#": "csharp/csharp-original.svg",
    html: "html5/html5-original.svg",
    css: "css3/css3-original.svg",
    shell: "bash/bash-original.svg",
    vue: "vuejs/vuejs-original.svg",
    kotlin: "kotlin/kotlin-original.svg",
  };
  const key = lang?.toLowerCase() || "";
  return map[key] ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${map[key]}` : null;
};
