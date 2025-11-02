# dependency-cache

This GitHub Action installs and caches Node.js or Composer **locally** per repository using hash-based caching. Designed for **self-hosted runners**, avoiding GitHub cache issues.

## Inputs

- `dist_root` – Path to the build directory (e.g., `/dist/${GITHUB_REPOSITORY//\//_}`)
- `cache_root` – Path to the local cache directory (e.g., `/cache/${GITHUB_REPOSITORY//\//_}`)

## Usage

```yaml
- name: Install node dependencies
  uses: ./.github/actions/dependency-cache
  with:
    dist_root: /dist/${GITHUB_REPOSITORY//\//_}
    cache_root: /cache/${GITHUB_REPOSITORY//\//_}
    type: php|node
