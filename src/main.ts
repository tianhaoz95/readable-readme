import lint from "./lint";

/**
 * This is the only entry point to the action workflow
 * under the hood it calls [[lint]].
 */
function main() {
  lint();
}

main();
