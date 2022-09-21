import { getServerSideSitemapIndex } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import axios from 'axios'

export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const urls = await axios.get('https://kanbox.vn/wp-json/sitemap/api').then((resonse) => resonse.data);

  let fields = [];
  urls.map((val) => {
    // all possible values
    fields.push({
        loc: val,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
    })

  return getServerSideSitemapIndex(ctx, fields);
}

export default function Sitemap() {}