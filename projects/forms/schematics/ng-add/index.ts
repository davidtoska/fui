import { Rule, Tree, SchematicContext } from "@angular-devkit/schematics";
import * as T from "@angular-devkit/schematics/tasks";
export function ngAdd(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info("Installing dependencies...");
    const t = new T.NodePackageInstallTask();
    console.log(tree);
    console.log(context);
    return tree;
  };
}
