import type {
  TemplateProps,
  TemplateRenderProps,
  GetPath,
  TemplateConfig,
} from "@yext/pages";
import { provideHeadless } from "@yext/search-headless-react";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { SearchBar, VerticalResults } from "@yext/search-ui-react";
import "src/index.css";

export const config: TemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  name: "search",
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = () => {
  return `search.html`;
};

const SearchTemplate = (data: TemplateRenderProps) => {
  const searcher = provideHeadless({
    apiKey: "d50dc472146257e64ff13138df821dd4",
    experienceKey: "deepak-test",
    locale: "en",
    verticalKey: "locations",
    endpoints: {
      universalSearch: `https://qa-cdn.yextapis-cdntest.com/v2/accounts/me/search/query`,
      verticalSearch: `https://qa-cdn.yextapis-cdntest.com/v2/accounts/me/search/vertical/query`,
      questionSubmission: `https://qa-cdn.yextapis-cdntest.com/v2/accounts/me/createQuestion`,
      status: "https://answersstatus.pagescdn.com",
      universalAutocomplete: `https://qa-cdn.yextapis-cdntest.com/v2/accounts/me/search/autocomplete`,
      verticalAutocomplete: `https://qa-cdn.yextapis-cdntest.com/v2/accounts/me/search/vertical/autocomplete`,
      filterSearch: `https://qa-cdn.yextapis-cdntest.com/v2/accounts/me/search/filtersearch`,
    },
  });

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <SearchBar />
      <VerticalResults
        CardComponent={(res) => <div>{JSON.stringify(res)}</div>}
      />
    </SearchHeadlessProvider>
  );
};

export default SearchTemplate;
